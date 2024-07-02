import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class DashboardHelper {
    mapUserData(serviceData: any) {
        let template: any = []
        serviceData.forEach((element: any) => {
            let currentStatusText = '';
            switch (element?.currentStatus) {
                case 'loaded':
                    currentStatusText = 'Loaded';
                    break;
                case 'inProgress':
                    currentStatusText = 'In-Progress';
                    break;
                case 'empty':
                    currentStatusText = 'Empty';
                    break;
                case 'completed':
                    currentStatusText = 'Completed';
                    break;
                case 'unloaded':
                    currentStatusText = 'Empty';
                    break;
                default:
                    currentStatusText = '-';
                    break;
            }
            let lshiftTime = '';
            switch (element?.loading?.shiftTime) {
                case '1':
                    lshiftTime = '1st Shift';
                    break;
                case '2':
                    lshiftTime = '2nd Shift';
                    break;
                case '3':
                    lshiftTime = '3rd Shift';
                    break;
                default:
                    lshiftTime = '-';
                    break;
            }

            let ushiftTime = '';
            switch (element?.unLoading?.shiftTime) {
                case '1':
                    ushiftTime = '1st Shift';
                    break;
                case '2':
                    ushiftTime = '2nd Shift';
                    break;
                case '3':
                    ushiftTime = '3rd Shift';
                    break;
                default:
                    ushiftTime = '-';
                    break;
            }
            template.push({
                barcode: element?.barcode ? element?.barcode : '',
                toteBoxName: element?.toteBoxName ? element?.toteBoxName : '',
                createdOn: element?.createdOn ? element?.createdOn : '',
                id: element?.id ? element?.id : '',
                isCompleted: element?.isCompleted ? element?.isCompleted : '',
                isEmpty: element?.isEmpty ? element?.isEmpty : '',
                loadingTime: element?.loading?.time ? element?.loading?.time : '-',
                loadingUser: element?.loading?.userName ? element?.loading?.userName : '-',
                loadingShift: lshiftTime,

                loading: lshiftTime ? 'Loading at ' + (element?.loading?.time) + ' (' + (lshiftTime) + ') ' + ' by ' + (element?.loading?.userName) : '',

                noOfPass: element?.noOfPass ? element?.noOfPass : '-',
                runningPass: element?.runningPass ? element?.runningPass : '-',
                shiftTime: element?.shiftTime ? element?.shiftTime : '-',
                unLoadingTime: element?.unLoading?.time ? element?.unLoading?.time : '-',
                unLoadingUser: element?.unLoading?.userName ? element?.unLoading?.userName : '-',
                unLoadingShift: ushiftTime,

                unloading: element?.unLoading?.time ? 'Unloading at ' + (element?.unLoading?.time) + ' (' + (ushiftTime) + ') ' + ' by ' + (element?.unLoading?.userName) : '-',

                updatedOn: element?.updatedOn ? element?.updatedOn : '-',
                timeArr: element?.time ? element?.time : '',
                currentStatus: currentStatusText,
            })
        });
        return template;
    }
    exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        const file = new File([data], fileName + EXCEL_EXTENSION, {
            type: EXCEL_TYPE,
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.click();
    }

// const EXCEL_TYPE =
//   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';

// mapExcelData(flattenedData: any) {
//     // Create a new Excel workbook
//     let wb = XLSX.utils.book_new();

//     // Convert data to worksheet
//     let wsData = flattenedData.map((entry: any) => {
//         let rowData = [
//             entry.id,
//             entry.barcode,
//             entry.toteBoxName,
//             entry.noOfPass,
//             entry.isEmpty,
//             entry.isCompleted,
//             entry.runningPass,
//             entry.loading.userName,
//             entry.loading.time,
//             entry.loading.shiftTime,
//             entry.unLoading.userName,
//             entry.unLoading.time,
//             entry.unLoading.shiftTime,
//             entry.createdBy.userId,
//             entry.createdBy.userName,
//             JSON.stringify(entry.time), // Store time array as JSON string
//             entry.currentStatus,
//             entry.isNotify,
//             entry.createdOn,
//             entry.updatedOn
//         ];
//         return rowData;
//     });

//     // Insert header row
//     let headerRow = [
//         'ID',
//         'Barcode',
//         'Tote Box Name',
//         'No of Pass',
//         'Is Empty',
//         'Is Completed',
//         'Running Pass',
//         'Loading User Name',
//         'Loading Time',
//         'Loading Shift Time',
//         'Unloading User Name',
//         'Unloading Time',
//         'Unloading Shift Time',
//         'Created By User ID',
//         'Created By User Name',
//         'Time (JSON)', // Header for the time array column as JSON string
//         'Current Status',
//         'Is Notify',
//         'Created On',
//         'Updated On'
//     ];

//     wsData.unshift(headerRow);

//     // Convert array of arrays to Excel worksheet
//     let ws = XLSX.utils.aoa_to_sheet(wsData);

//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(wb, ws, 'Flattened Data');

//     // Write the workbook to a file named flattened_data.xlsx
//     XLSX.writeFile(wb, 'flattened_data.xlsx');
// }



exportJsonToExcel(data: any[]): any[] {

    let flattenedData: any[] = [];

    data.forEach((item: any) => {

        let times = item.time?.map((timeEntry: any) => ({
            'pass': timeEntry.pass_number,
            'in_time': new Date(timeEntry.scanner_two_in_time).toLocaleString(),
            'out_time': new Date(timeEntry.scanner_three_out_time).toLocaleString()
        }));

        let entry: any = {
            // id: item.id,
            // barcode: item.barcode,
            'Box Name': item?.toteBoxName ? item?.toteBoxName : '',
            'No of pass': item?.noOfPass ? item?.noOfPass : item?.noOfPass,
            // isEmpty: item.isEmpty,
            // isCompleted: item.isCompleted,
            // runningPass: item.runningPass,
            // loadingUserName: item.loading.userName,
            // loadingTime: item.loading.time,
            // loadingShiftTime: item.loading.shiftTime,
            'Unloading User': item.unLoading?.userName ? item.unLoading?.userName : '',
            'Unloading Time': item.unLoading?.time ? item.unLoading?.time : '',
            'Unloading Shift': item.unLoading?.shiftTime ? item.unLoading?.shiftTime : '',
            // createdByUserId: item.createdBy.userId,
            // createdByUserName: item.createdBy.userName,
            // createdOn: item.createdOn,
            // updatedOn: item.updatedOn,
            'Current Status': item?.currentStatus ? item?.currentStatus: '',
            'Time': JSON.stringify(times)

        };
        flattenedData.push(entry);
    });
    return flattenedData;

}
}