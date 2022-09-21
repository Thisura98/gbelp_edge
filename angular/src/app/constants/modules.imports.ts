import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { SecurityContext } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { NgApexchartsModule } from "ng-apexcharts";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "../app-routing.module";
import { CustomRenderer } from "../utils/md-renderer";

export const APP_IMPORTS = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSnackBarModule,
  MatTooltipModule,
  MonacoEditorModule,
  MarkdownModule.forRoot({ 
    loader: HttpClient, 
    sanitize: SecurityContext.NONE, // to allow 'id' attributes in CustomRenderer
    markedOptions: {
      provide: MarkedOptions,
      useFactory: CustomRenderer,
    } 
  }),
  NgApexchartsModule,  // or this
  ToastrModule.forRoot()
];