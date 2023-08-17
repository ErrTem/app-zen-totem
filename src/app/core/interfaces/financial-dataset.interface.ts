export interface FinancialDatasetInterface {
  id: string;
  description: string;
  key: string;
  subkey: string;
  schema: {
    type: string;
    properties: {
      formFiscalYear: {
        type: string;
      };
      formFiscalQuarter: {
        type: string;
      };
      version: {
        type: string;
      };
      periodStart: {
        type: string;
      };
      periodEnd: {
        type: string;
      };
      dateFiled: {
        type: string;
      };
      reportLink: {
        type: string;
      };
      adsh: {
        type: string;
      };
      stat: {
        type: string;
      };
    };
  };
  weight: number;
  created: string;
  lastUpdated: string;
}
