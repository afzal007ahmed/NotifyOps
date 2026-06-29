import { routes } from "@/routes/routes";
import {
  BarChart3,
  CreditCard,
  FileText,
  KeyRound,
  Logs,
} from "lucide-react";

export const menuItems = [
  { label: "Templates", icon: FileText, link: routes.TEMPLATES },
  { label: "API Keys", icon: KeyRound, link: routes.APIKEYS },
  { label: "Subscription", icon: CreditCard, link: routes.SUBSCRIPTIONS },
  { label: "Logs", icon: Logs , link : routes.LOGS},
  { label : "Analytics" , icon : BarChart3 , link : routes.ANALYTICS }
];

export const roleItems = [
  {
    value: "OWNER",
    label: "Owner",
  },
  {
    value: "ADMIN",
    label: "Admin",
  },
  {
    value: "DEVELOPER",
    label: "Developer",
  },
  {
    value: "VIEWER",
    label: "Viewer",
  },
];

export const apiKeyMoreOptions = ["delete", "revoke"];

export const templateOptions = [
  {
    id: "email",
    label: "Email",
  },
  {
    id: "sms",
    label: "Sms",
  },
  {
    id: "inapp",
    label: "In App",
  },
];
