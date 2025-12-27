import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';

export const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
    <View style={styles.table}>
        <View style={styles.tableRow}>
            {headers.map((header, i) => (
                <View key={i} style={styles.tableCol}>
                    <Text style={styles.tableHeaderCell}>{header}</Text>
                </View>
            ))}
        </View>
        {rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
                {row.map((cell, j) => (
                    <View key={j} style={styles.tableCol}>
                        <Text style={styles.tableCell}>{cell}</Text>
                    </View>
                ))}
            </View>
        ))}
    </View>
);

export const FlowDiagram = ({ primaryConstraint }: { primaryConstraint: string }) => (
    <View style={{ alignItems: 'center', marginVertical: 30 }}>
        <View style={styles.flowBox}><Text style={styles.bold}>Inbound Demand</Text></View>
        <Text style={styles.flowArrow}>↓</Text>
        <View style={styles.flowBox}><Text style={styles.bold}>Call / Message Received</Text></View>
        <Text style={styles.flowArrow}>↓</Text>
        <View style={[styles.flowBox, styles.primaryConstraint]}>
            <Text style={styles.muted}>[ BOTTLENECK ]</Text>
            <Text style={styles.bold}>{primaryConstraint}</Text>
        </View>
        <Text style={styles.flowArrow}>↓</Text>
        <View style={styles.flowBox}><Text style={styles.bold}>Follow-Up Breakdown</Text></View>
        <Text style={styles.flowArrow}>↓</Text>
        <View style={styles.flowBox}><Text style={styles.bold}>Uncaptured Revenue</Text></View>
    </View>
);
