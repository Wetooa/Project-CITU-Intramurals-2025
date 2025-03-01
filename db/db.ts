import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export type GoogleSheetsTitle = "leaderboard" | "player";

class GoogleSheetsClient {
  private doc;
  private static instance: GoogleSheetsClient;
  private sheetId: string | undefined;

  constructor() {
    this.sheetId = process.env.GOOGLE_SHEET_ID;

    if (this.sheetId === undefined) {
      throw new Error("URL is not defined");
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.doc = new GoogleSpreadsheet(this.sheetId, serviceAccountAuth);
  }

  static getInstance(): GoogleSheetsClient {
    if (!GoogleSheetsClient.instance) {
      GoogleSheetsClient.instance = new GoogleSheetsClient();
    }
    return GoogleSheetsClient.instance;
  }

  async getSheetData(sheetTitle: GoogleSheetsTitle) {
    await this.doc.loadInfo();

    const sheet = this.doc.sheetsByTitle[sheetTitle];
    const rows = await sheet.getRows();

    return rows;
  }
}

export const googleSheets = GoogleSheetsClient.getInstance();
