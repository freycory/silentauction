import { Component, OnInit } from "@angular/core";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-donations",
  templateUrl: "./donations.component.html",
  styleUrls: ["./donations.component.css"],
})
export class DonationsComponent implements OnInit {
  events: any[] = [];

  constructor(private server: ServerService) {}

  ngOnInit() {
    this.getEvents();
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
