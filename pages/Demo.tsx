import React, { useEffect, useState, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { motion } from 'framer-motion';
import AudioWaveform from '../components/AudioWaveform';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

type CallState = 'idle' | 'listening' | 'speaking';

const Demo: React.FC = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const retellClientRef = useRef<RetellWebClient | null>(null);

    // Determine the waveform state
    const getWaveformState = (): CallState => {
        if (!isCalling) return 'idle';
        if (isAgentSpeaking) return 'speaking';
        return 'listening';
    };

    useEffect(() => {
        // Initialize the client only once
        retellClientRef.current = new RetellWebClient();

        // Setup event listeners
        retellClientRef.current.on('agent_start_talking', () => {
            setIsAgentSpeaking(true);
        });

        retellClientRef.current.on('agent_stop_talking', () => {
            setIsAgentSpeaking(false);
        });

        retellClientRef.current.on('call_ended', () => {
            setIsCalling(false);
            setIsAgentSpeaking(false);
        });

        retellClientRef.current.on('error', () => {
            setError('Connection error. Please refresh and try again.');
            setIsCalling(false);
        });

    }, []);

    const startCall = async () => {
        setError(null);
        setIsCalling(true);

        try {
            // 1. Get access token from our backend
            const response = await fetch('/api/create-web-call', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to get access token');
            }

            const data = await response.json();

            // 2. Start the call
            if (retellClientRef.current) {
                await retellClientRef.current.startCall({
                    accessToken: data.access_token,
                });
            }
        } catch {
            setError('Could not start the call. Please check your microphone permissions.');
            setIsCalling(false);
        }
    };

    const stopCall = () => {
        if (retellClientRef.current) {
            retellClientRef.current.stopCall();
            setIsCalling(false);
            setIsAgentSpeaking(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black z-0"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl px-4">
                <div className="mb-12">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6 gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Live AI Demo
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Talk to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">Qual AI</span>
                    </h1>
                    <p className="text-xl text-blue-200/80 leading-relaxed font-light">
                        Experience the 60-second booking speed. Click below to start a realistic voice conversation with our AI agent.
                    </p>
                </div>

                {/* Visualizer / Status */}
                <Card className="bg-navy-900/50 border-blue-500/20 mb-12 py-8">
                    <CardContent className="h-64 flex items-center justify-center relative">
                        {isCalling ? (
                            <div className="relative flex flex-col items-center">
                                {/* Pulse Effect when Agent Speaks */}
                                {isAgentSpeaking && (
                                    <>
                                        <motion.div
                                            className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
                                            animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            style={{ top: -16, left: -16, right: -16, bottom: 64 }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-blue-400 rounded-full opacity-20"
                                            animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                            style={{ top: -16, left: -16, right: -16, bottom: 64 }}
                                        />
                                    </>
                                )}

                                {/* Microphone with Glow Effect */}
                                <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all duration-500 ${isAgentSpeaking ? 'bg-gradient-to-tr from-blue-500 to-accent scale-110' : 'bg-navy-800 border-2 border-blue-500/30'} ${!isAgentSpeaking && isCalling ? 'mic-glow-listening' : ''}`}>
                                    <svg className={`w-12 h-12 transition-all duration-300 ${isAgentSpeaking ? 'text-white' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                    </svg>
                                </div>

                                {/* Audio Waveform Visualizer */}
                                <div className="mt-6">
                                    <AudioWaveform state={getWaveformState()} barCount={5} />
                                </div>

                                <p className="mt-4 text-blue-300 font-medium whitespace-nowrap animate-pulse">
                                    {isAgentSpeaking ? "AI is speaking..." : "Listening..."}
                                </p>
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-navy-800/50 border border-white/5 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                </svg>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4">
                    {!isCalling ? (
                        <Button
                            onClick={startCall}
                            size="lg"
                            className="bg-accent hover:bg-blue-600 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 h-auto"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A17.6 17.6 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 9.5 9.5 0 009.5 9.5c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-1.66-1.34-3-3-3v2c.55 0 1 .45 1 1z" /></svg>
                            Start Conversation
                        </Button>
                    ) : (
                        <Button
                            onClick={stopCall}
                            variant="destructive"
                            size="lg"
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-8 py-4 rounded-xl font-bold h-auto"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2zm0-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2zm0-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2z" /></svg>
                            End Call
                        </Button>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Alert variant="destructive" className="bg-red-950/30 border-red-500/20">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription className="text-red-400">{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </div>

                <p className="mt-12 text-blue-200/40 text-sm">
                    Qual AI voice agents are powered by Retell AI & Custom LLMs.
                </p>
            </div>
        </div>
    );
};

export default Demo;
