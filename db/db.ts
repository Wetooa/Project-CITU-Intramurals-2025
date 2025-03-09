import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { GoogleSheetsTitleType } from "@/types/types";

class GoogleSheetsClient {
  private doc;
  private static instance: GoogleSheetsClient;
  private sheetId: string | undefined;

  constructor() {
    this.sheetId = process.env.SHEET_ID;

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

  async getSheetData(sheetTitle: GoogleSheetsTitleType) {
    await this.doc.loadInfo();

    const sheet = this.doc.sheetsByTitle[sheetTitle];

    return sheet;
  }
}

export const GS = GoogleSheetsClient.getInstance();
