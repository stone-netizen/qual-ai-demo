import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';

export const Header = ({ businessName, date }: { businessName: string; date: string }) => (
    <View style={styles.header} fixed>
        <Text style={styles.headerText}>REVENUE LEAK DIAGNOSTIC REPORT</Text>
        <Text style={styles.headerText}>{businessName} | {date}</Text>
    </View>
);

export const Footer = () => (
    <View style={styles.footer} fixed>
        <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        <Text>Directional estimates only. Internal-use diagnostic brief.</Text>
    </View>
);

export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <View style={styles.section}>
        <Text style={styles.h2}>{title}</Text>
        {subtitle && <Text style={[styles.text, styles.muted]}>{subtitle}</Text>}
    </View>
);

export const CalloutBox = ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <View style={styles.callout}>
        {title && <Text style={[styles.h3, { marginBottom: 5 }]}>{title}</Text>}
        <View>{children}</View>
    </View>
);
