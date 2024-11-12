import { Surreal } from 'surrealdb';
import { surrealdbNodeEngines } from '@surrealdb/node';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const db = new Surreal({
    engines: surrealdbNodeEngines(),
})
try {
    await db.connect('http://localhost:8000/rpc', {
        namespace: 'asymmetric',
        database: 'events_registrations',
        auth: {
            username: 'root',
            password: 'root',
        }
    });
    console.log('connected to surrealdb');
    await db.query(fs.readFileSync(path.dirname(fileURLToPath(import.meta.url)) + '/migrations/eventregistration-up.surql', { encoding: 'utf-8' }));
} catch (error) {
    console.error('failed to connect to surrealdb', error instanceof Error ? error.message : String(error));
} finally {
    db.close();
}