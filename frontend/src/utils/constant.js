import { SubDomainRouter } from "../AppRouter"
import AppRouter from "../AppRouter";

export const subDomainList = [
    {subdomain: "www", app: AppRouter, main: true},
    {subdomain: "url", app: SubDomainRouter, main: false}
];