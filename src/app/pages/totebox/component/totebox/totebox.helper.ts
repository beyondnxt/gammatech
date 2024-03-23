import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ToteboxHelper {
    mapUserData(serviceData: any) {
        // console.log("8-------", serviceData);
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                toteBoxName: element?.toteBoxName ? element?.toteBoxName : '',
                barcode:element?.barcode ? element?.barcode : '',
                isEmpty:element?.isEmpty ? 'Unloaded' : 'Loaded',
                id:element?.id ? element?.id : '',
             })
        });
        return template;
    }
}