'use client';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { FileText } from 'lucide-react';

// * Define the styles for the PDF document.
const styles = StyleSheet.create({
	page: {
		fontSize: 12,
		paddingTop: 20,
		paddingLeft: 40,
		paddingRight: 40,
		lineHeight: 1.5,
		flexDirection: 'column',
	},

	header: {
		marginBottom: 20,
		textAlign: 'center',
	},

	headerContent: {
		fontSize: 26,
		fontWeight: 'extrabold',
		margin: 8,
	},

	invoice: { fontWeight: 'bold', fontSize: 20, color: '#3E3E3E' },

	invoiceInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	infoCell: {
		fontSize: 10,
	},

	tableContainer: { marginBottom: 20 },

	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#b5b5b5',
		borderBottomWidth: 1,
	},

	headerCell: {
		fontSize: 14,
		fontWeight: 'bold',
		margin: 3,
	},

	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#b5b5b5',
		borderBottomWidth: 1,
	},

	tableCell: {
		fontSize: 10,
		margin: 5,
	},

	footerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#b5b5b5',
		borderBottomWidth: 1,
	},
	footerCell: {
		fontSize: 10,
		fontWeight: 'extrabold',
		margin: 5,
	},
});

// * Define the header component for the PDF document.
const Header = () => (
	<View style={styles.header}>
		<Text style={styles.headerContent}>Société JIHAD ALMOHASSIB</Text>
	</View>
);

// * Define the invoice information component for the PDF document.
const InvoiceInfo = ({ facture }: { facture: any }) => (
	<>
		<View style={styles.invoiceInfo}>
			<Text style={styles.invoice}>Facture</Text>
		</View>
		<View style={styles.invoiceInfo}>
			<View>
				<Text style={styles.infoCell}>Code de facture: {facture.id}</Text>
				<Text style={styles.infoCell}>Année de facture: {facture.issueYear}</Text>
				<Text style={styles.infoCell}>Montant de facture: {formatCurrency(facture.totalAmount)}</Text>
				<Text style={{ marginTop: 3, fontSize: 10 }}>Code de client: {facture.clientId}</Text>
			</View>
		</View>
	</>
);

// * Define the table component for the PDF document.
const TableHeader = () => (
	<View style={styles.headerRow}>
		<Text style={styles.headerCell}>Payment code</Text>
		<Text style={styles.headerCell}>Date de creation</Text>
		<Text style={styles.headerCell}>Montant payé</Text>
	</View>
);
const TableRow = ({ payment }: { payment: any }) => (
	<View style={styles.tableRow}>
		<Text style={styles.tableCell}>{payment.id}</Text>
		<Text style={styles.tableCell}>{payment.createdAt.slice(0, 10)}</Text>
		<Text style={styles.tableCell}>{formatCurrency(payment.amount)}</Text>
	</View>
);
const TableFooter = ({ total, text }: { total: string; text: string }) => (
	<View style={styles.footerRow}>
		<Text style={(styles.footerCell, { marginLeft: 5 })}>{text}</Text>
		<Text style={styles.footerCell}>{total}</Text>
	</View>
);

// * Define the footer component for the PDF document.
const Footer = () => (
	<View fixed style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
		<View style={{ borderBottom: '1px solid black', marginBottom: 5, marginLeft: 10, marginRight: 10 }} />
		<Text style={{ fontSize: 8, textAlign: 'center' }}>
			Address: Etage N°1 Appt N°2 Immeuble NIAS Rue Ahmed Taib Benhima Ville Nouvelle - Safi
		</Text>
		<Text style={{ fontSize: 8, textAlign: 'center' }}>
			Tél: 06 61 51 45 92 <Text style={{ stroke: 'black', fontWeight: 'extrabold' }}>/</Text> 05 40 05 94 42
		</Text>
	</View>
);

// * Define the PDF document component.
const MyPDFDocument = ({ facture }: { facture: any }) => {
	const total = facture.payments.reduce((payments: any[], payment: any) => payments + payment.amount, 0);
	const reste = facture.totalAmount - total;
	return (
		<Document>
			<Page size={'A4'} style={styles.page}>
				<Header />
				<InvoiceInfo facture={facture} />
				<View style={styles.tableContainer}>
					<TableHeader />
					{facture.payments.map((payment: any) => (
						<TableRow key={payment.id} payment={payment} />
					))}
					<TableFooter total={formatCurrency(total)} text={'Total'} />
					<TableFooter total={formatCurrency(reste)} text={'Reste'} />
				</View>
				<Footer />
			</Page>
		</Document>
	);
};

export default function PdfLink({ facture }: { facture: any }) {
	return (
		<PDFDownloadLink document={<MyPDFDocument facture={facture} />} fileName={`facture-${facture.id}.pdf`}>
			{({ loading }) =>
				loading ? (
					'Loading'
				) : (
					<Button className='flex items-center gap-3 pl-1 pr-10 py-4 h-5' variant='ghost'>
						<FileText size={16} />
						Télecharger
					</Button>
				)
			}
		</PDFDownloadLink>
	);
}
