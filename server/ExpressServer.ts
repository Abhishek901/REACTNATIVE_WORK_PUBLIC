import * as express from 'express'
import { Express } from 'express'
import { Server } from 'http'
import * as compress from 'compression'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';
import * as path from 'path'
import { noCache } from './middlewares/NoCacheMiddleware'
import DatadogStatsdMiddleware from './middlewares/DatadogStatsdMiddleware'
import { addServicesToRequest } from './middlewares/ServiceDependenciesMiddleware'
import BackendRouter from '../routes/router';
const rateLimit = require("express-rate-limit");
require('../dataAccess/db/db');

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express
    private httpServer?: Server
    constructor() {

    }

    public async setup(port: number) {
        const server = express()
        this.setupStandardMiddlewares(server)
        this.configureStaticAssets(server)
        //this.setupTelemetry(server)
        // this.setupServiceDependencies(server)
        this.setupSecurityMiddlewares(server);
        this.configureApiEndpoints(server)
        this.httpServer = this.listen(server, port)
        this.server = server
        return this.server
    }

    public listen(server: Express, port: number) {
        console.log(`Server is listening on Port ${port}`);
        return server.listen(port)
    }

    public kill() {
        if (this.httpServer) this.httpServer.close()
    }
    

    private setupSecurityMiddlewares(server: Express) {
        server.use(hpp())
        server.use(helmet())
        server.use(helmet.referrerPolicy({ policy: 'same-origin' }))
        server.use(helmet.noCache())
        server.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'unsafe-inline'"],
                    scriptSrc: ["'unsafe-inline'", "'self'"]
                }
            })
        )
    }


    private setupStandardMiddlewares(server: Express) {
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(cookieParser());
        server.use(compress());
        server.use(session({
            resave: true,
            saveUninitialized: true,
            secret: 'keyboard cat',
            cookie: {
              maxAge: 60000,
              secure: false
            }
          }));
        const baseRateLimitingOptions = {
            windowMs: 15 * 60 * 1000, // 15 min in ms
            max: 1000,
            message: 'Our API is rate limited to a maximum of 1000 requests per 15 minutes, please lower your request rate'
        };
        server.use('/api/', rateLimit(baseRateLimitingOptions));
    }
    private configureStaticAssets(server: Express) {
        console.log('Congiguring static assest..');
        server.use('/public', express.static('public/images'))
    }
    // private setupTelemetry(server: Express) {
    //     DatadogStatsdMiddleware.applyTo(server, {
    //         targetHost: 'https://datadog.mycompany.com',
    //         enableTelemetry: false,
    //         tags: ['team:cats', 'product:cats-provider']
    //     })
    // }

    // private setupServiceDependencies(server: Express) {
    //     const servicesMiddleware = addServicesToRequest(this.requestServices)
    //     server.use(servicesMiddleware)
    // }

    private configureApiEndpoints(server: Express) {
        const router = new BackendRouter();
        router.load(server, 'controllers')
    }
}
    