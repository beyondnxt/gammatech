import { Injectable } from "@angular/core";

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
}