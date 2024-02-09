"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heroes_service_1 = require("./services/heroes.service");
const hero = (0, heroes_service_1.findHeroById)(2);
console.log(hero !== null && hero !== void 0 ? hero : 'Hero not found');
