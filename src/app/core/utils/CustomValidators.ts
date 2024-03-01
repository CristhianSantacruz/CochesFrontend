import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


export class CustomValidators {


  public static numberDateFuture(control : FormControl) : {
    [p:string]:boolean} | null {
    if(control.value){
      const today = new Date(Date.now()).getFullYear();
      if(control.value > (today)){
        return {'invalidDate':true}
      }
    }
    return null;

  }
}
