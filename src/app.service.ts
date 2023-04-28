import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { UploadFile } from './dto/upload-file.dto';
import { readFileSync, unlink } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async importData(file: UploadFile) {
    const cvsFile = readFileSync(file.path);
    const csvData = (await cvsFile).toString();

    let rows = 0;
    const parsedCsv = parse(csvData, {
      header: false,
      skipEmptyLines: true,
      step: (row) => {
        console.log('row: ', row.data);

        // TODO: store row.data into db

        rows++;
      },
      complete: () => {
        unlink(file.path, () => {
          console.log('Successfully deleted file!');
        });
      },
    });

    if (parsedCsv.errors.length) {
      return {
        status: false,
        message: parsedCsv.errors,
      };
    }

    return {
      status: true,
      message: 'Successfully imported',
      rows,
    };
  }
}
