"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maybe = ({ render, renderAlt, pred }) => pred() ? render() : renderAlt();
exports.Maybe = Maybe;
