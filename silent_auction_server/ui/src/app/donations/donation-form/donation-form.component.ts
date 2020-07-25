import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { ServerService } from "../../services/server.service";

@Component({
  selector: "app-donation-form",
  templateUrl: "./donation-form.component.html",
  styleUrls: [],
})
export class DonationFormComponent implements OnInit {
  form: FormGroup;

  events: any[] = [];
  currentEvent: any = { id: null, name: "", description: "", date: new Date() };
  modalCallback: () => void;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private server: ServerService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentEvent.name, Validators.required],
      description: this.currentEvent.description,
      date: [this.currentEvent.date, Validators.required],
    });
    this.getEvents();
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentEvent.name,
      description: this.currentEvent.description,
      date: new Date(this.currentEvent.date),
    });
  }

  getFormGroup() {
    return FormGroup;
  }

  private getEvents() {
    this.server.getEvents().then((response: any) => {
      console.log("Response", response);
      this.events = response.map((ev) => {
        ev.body = ev.description;
        ev.header = ev.name;
        ev.icon = "fa-clock-o";
        return ev;
      });
    });
  }
}
