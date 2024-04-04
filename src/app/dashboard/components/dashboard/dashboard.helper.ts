import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DashboardHelper {
    mapUserData(serviceData: any) {
        let template:any = []
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
                default:
                    currentStatusText = '-';
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
                loadingUser:element?.loading?.userName ? element?.loading?.userName : '-',
                loadingShift:element?.loading?.shiftTime ? element?.loading?.shiftTime : '-',
                noOfPass: element?.noOfPass ? element?.noOfPass : '-',
                runningPass: element?.runningPass ? element?.runningPass : '-',
                shiftTime: element?.shiftTime ? element?.shiftTime : '-',
                unLoadingTime: element?.unLoading?.time ? element?.unLoading?.time : '-',
                unLoadingUser:element?.unLoading?.userName ? element?.unLoading?.userName : '-',
                unLoadingShift:element?.unLoading?.shiftTime ? element?.unLoading?.shiftTime : '-',
                updatedOn: element?.updatedOn ? element?.updatedOn : '-',
                timeArr:element?.time ? element?.time : '',
                currentStatus:currentStatusText,
             })
        });
        return template;
    }
}