import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { ReportPayload } from '../lib/report/buildReportPayload';
import { styles } from './styles';
import { Header, Footer, SectionTitle, CalloutBox } from './components/BaseComponents';
import { Table, FlowDiagram } from './components/VisualizationComponents';

export const DiagnosticPDF = ({ payload }: { payload: ReportPayload }) => {
    const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <Document title={`Revenue Leak Diagnostic - ${payload.business.name}`}>
            {/* PAGE 1: COVER */}
            <Page size="LETTER" style={styles.page}>
                <View style={{ marginTop: 100 }}>
                    <Text style={styles.h1}>Revenue Leak Diagnostic Report</Text>
                    <Text style={[styles.text, styles.muted]}>
                        Directional operational analysis based on your inputs and observed industry patterns
                    </Text>
                </View>

                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E2E8F0', marginVertical: 40 }} />

                <View style={{ position: 'absolute', bottom: 100, left: 50 }}>
                    <Text style={styles.bold}>{payload.business.name}</Text>
                    <Text style={styles.muted}>{payload.business.industry}</Text>
                    <Text style={styles.muted}>{formatDate(payload.generatedAt)}</Text>
                </View>
                <View style={{ position: 'absolute', bottom: 100, right: 50 }}>
                    <Text style={styles.muted}>Report ID: {payload.reportId}</Text>
                </View>
            </Page>

            {/* PAGE 2: EXECUTIVE SUMMARY */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="Executive Summary" />

                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                            Based on the information provided, this diagnostic indicates potential revenue leakage caused by operational constraints, not demand generation issues.
                        </Text>
                        <Text style={styles.text}>
                            The estimates below are conservative and directional. They are intended to highlight where to look, not predict outcomes.
                        </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Table
                            headers={['Metric', 'Estimate']}
                            rows={[
                                ['Monthly Revenue at Risk', `${formatCurrency(payload.leaks[0]?.estimateLow || 0)} - ${formatCurrency(payload.leaks[0]?.estimateHigh || 0)}`],
                                ['Primary Constraint', payload.primaryConstraint.title],
                                ['Confidence Level', 'Conservative']
                            ]}
                        />
                    </View>
                </View>
                <Footer />
            </Page>

            {/* PAGE 3: HOW TO INTERPRET */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="How to Interpret This Diagnostic" />

                <CalloutBox title="What This Is">
                    <Text style={styles.text}>• A directional operational estimate</Text>
                    <Text style={styles.text}>• Built from observed patterns across service businesses</Text>
                    <Text style={styles.text}>• Designed to surface invisible constraints</Text>
                </CalloutBox>

                <CalloutBox title="What This Is Not">
                    <Text style={styles.text}>• A guarantee or financial forecast</Text>
                    <Text style={styles.text}>• A marketing projection</Text>
                    <Text style={styles.text}>• A software pitch</Text>
                </CalloutBox>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.h3}>Why It Matters</Text>
                    <Text style={styles.text}>
                        In most service businesses, revenue leakage occurs after leads are generated — during response, routing, and follow-up. These gaps are rarely visible without structured review.
                    </Text>
                </View>
                <Footer />
            </Page>

            {/* PAGE 4: BOTTLENECK FLOW */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="Identified Operational Constraints" />
                <FlowDiagram primaryConstraint={payload.primaryConstraint.title} />
                <Text style={[styles.text, { textAlign: 'center', marginTop: 20, color: '#64748B' }]}>
                    The primary constraint is where intervention produces the highest leverage.
                </Text>
                <Footer />
            </Page>

            {/* PAGE 5: PRIMARY CONSTRAINT DEEP DIVE */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title={`Primary Constraint: ${payload.primaryConstraint.title}`} />

                <View style={styles.section}>
                    <Text style={styles.h3}>Observed Pattern</Text>
                    <Text style={styles.text}>
                        {payload.leaks.find(l => l.id === payload.primaryConstraint.id)?.whyCommon}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.h3}>Your Inputs Suggest</Text>
                    {payload.leaks.find(l => l.id === payload.primaryConstraint.id)?.inputsUsed.map((input, i) => (
                        <Text key={i} style={styles.text}>• {input}</Text>
                    ))}
                </View>

                <CalloutBox title="Economic Impact (Conservative)">
                    <Text style={styles.h1}>
                        {formatCurrency(payload.leaks.find(l => l.id === payload.primaryConstraint.id)?.estimateLow || 0)} - {formatCurrency(payload.leaks.find(l => l.id === payload.primaryConstraint.id)?.estimateHigh || 0)}
                    </Text>
                    <Text style={styles.muted}>Estimated Monthly Revenue Affected</Text>
                </CalloutBox>
                <Footer />
            </Page>

            {/* PAGE 6: SECONDARY CONSTRAINT */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                {payload.leaks.length > 1 ? (
                    <>
                        <SectionTitle title={`Secondary Constraint: ${payload.leaks[1].title}`} />
                        <Text style={styles.text}>{payload.leaks[1].whyCommon}</Text>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.h3}>Impact Analysis</Text>
                            <Text style={styles.text}>Potential monthly loss: {formatCurrency(payload.leaks[1].estimateLow)} - {formatCurrency(payload.leaks[1].estimateHigh)}</Text>
                        </View>
                    </>
                ) : (
                    <View style={{ marginTop: 100, alignItems: 'center' }}>
                        <Text style={styles.h3}>No secondary constraint identified at this time.</Text>
                        <Text style={styles.text}>Current primary constraint accounts for the majority of operational leakage.</Text>
                    </View>
                )}
                <Footer />
            </Page>

            {/* PAGE 7: WHY GAPS PERSIST */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="Why These Gaps Persist" />
                <View style={styles.section}>
                    <Text style={styles.text}>• Front desks optimize for service, not capture</Text>
                    <Text style={styles.text}>• After-hours demand is invisible internally</Text>
                    <Text style={styles.text}>• Manual follow-up breaks under load</Text>
                    <Text style={styles.text}>• No SLA or response ownership</Text>
                </View>
                <CalloutBox>
                    <Text style={{ fontStyle: 'italic', color: '#475569' }}>
                        "These issues persist not because of neglect, but because they sit between teams and systems."
                    </Text>
                </CalloutBox>
                <Footer />
            </Page>

            {/* PAGE 8: TECHNICAL VERIFICATION */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="What a Technical Review Verifies" />
                <View style={styles.section}>
                    {[
                        "Actual missed call logs vs reported volume",
                        "Response timestamps from first inquiry",
                        "Lead routing and handoff paths",
                        "Follow-up attempt frequency and depth",
                        "Economic relevance of fixing the primary constraint"
                    ].map((item, i) => (
                        <View key={i} style={{ flexDirection: 'row', marginBottom: 10, gap: 10 }}>
                            <Text style={{ width: 15, height: 15, borderWidth: 1, borderColor: '#CBD5E1' }}> </Text>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.bold, { marginTop: 20 }]}>
                    If verification shows the leak is immaterial or uneconomical to fix, we will say so.
                </Text>
                <Footer />
            </Page>

            {/* PAGE 9: RECOMMENDED NEXT STEP */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="Recommended Next Step" />
                <Text style={styles.text}>
                    The logical next step is a short technical review to verify whether these constraints materially impact your business.
                </Text>
                <Text style={styles.text}>This is not a sales call. It is a verification step.</Text>

                <View style={{ marginVertical: 40, padding: 30, borderStyle: 'dashed', borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' }}>
                    <Text style={[styles.h3, { marginBottom: 10 }]}>Book Technical Verification Review</Text>
                    <Text style={styles.text}>Duration: 15 minutes</Text>
                    <Text style={styles.text}>Purpose: Validate data & determine relevance</Text>
                    <Text style={[styles.muted, { fontSize: 9, marginTop: 10 }]}>
                        If no meaningful fix exists, you’ll leave with clarity — not an offer.
                    </Text>
                </View>
                <Footer />
            </Page>

            {/* PAGE 10: DISCLAIMERS */}
            <Page size="LETTER" style={styles.page}>
                <Header businessName={payload.business.name} date={formatDate(payload.generatedAt)} />
                <SectionTitle title="Disclaimers & Notes" />
                <View style={styles.section}>
                    {payload.disclaimers.map((d, i) => (
                        <Text key={i} style={[styles.text, styles.muted, { fontSize: 9 }]}>• {d}</Text>
                    ))}
                    {payload.assumptions.map((a, i) => (
                        <Text key={i} style={[styles.text, styles.muted, { fontSize: 9 }]}>• {a}</Text>
                    ))}
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={[styles.muted, { fontSize: 8 }]}>
                        © {new Date().getFullYear()} Revenue Leak Diagnostic. All rights reserved. Internal Use Only.
                    </Text>
                </View>
                <Footer />
            </Page>
        </Document>
    );
};
