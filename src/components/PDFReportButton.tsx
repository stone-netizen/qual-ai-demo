import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DiagnosticPDF } from '../pdf/DiagnosticPDF';
import { ReportPayload } from '../lib/report/buildReportPayload';
import { FileText, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFReportButtonProps {
    payload: ReportPayload;
}

export const PDFReportButton = ({ payload }: PDFReportButtonProps) => {
    const sanitizeName = (name: string) => name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `Revenue-Leak-Diagnostic_${sanitizeName(payload.business.name || 'Business')}_${dateStr}.pdf`;

    return (
        <div className="flex justify-center md:justify-start">
            <PDFDownloadLink
                document={<DiagnosticPDF payload={payload} />}
                fileName={filename}
                className="no-underline"
            >
                {({ loading }) => (
                    <Button
                        size="lg"
                        variant="outline"
                        disabled={loading}
                        className="group relative overflow-hidden px-8 py-6 h-auto text-lg font-bold uppercase italic border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-emerald-400 transition-all active:scale-95 flex items-center gap-3 rounded-2xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Preparing Brief...</span>
                            </>
                        ) : (
                            <>
                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Download Diagnostic Brief (PDF)</span>
                                <Download className="w-4 h-4 opacity-50 group-hover:translate-y-0.5 transition-transform" />
                            </>
                        )}

                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                )}
            </PDFDownloadLink>
        </div>
    );
};
