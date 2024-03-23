import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DashboardHelper {
    mapUserData(serviceData: any) {
        // console.log("8-------", serviceData);
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                barcode: element?.barcode ? element?.barcode : '',
                createdOn: element?.createdOn ? element?.createdOn : '',
                id: element?.id ? element?.id : '',
                isCompleted: element?.isCompleted ? element?.isCompleted : '',
                isEmpty: element?.isEmpty ? element?.isEmpty : '',
                loadingTime: element?.loadingTime ? element?.loadingTime : '',
                noOfPass: element?.noOfPass ? element?.noOfPass : '',
                runningPass: element?.runningPass ? element?.runningPass : '',
                shiftTime: element?.shiftTime ? element?.shiftTime : '',
                unLoadingTime: element?.unLoadingTime ? element?.unLoadingTime : '',
                updatedOn: element?.updatedOn ? element?.updatedOn : '',
                timeArr:element?.time ? element?.time : '',
                currentStatus:'completed',
                userName:element?.userName ? element?.userName : '',
             })
        });
        return template;
    }
}