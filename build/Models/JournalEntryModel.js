"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryModel = void 0;
const mongoose_1 = require("mongoose");
const JournalEntrySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    userIds: { type: [String], required: true },
});
exports.JournalEntryModel = (0, mongoose_1.model)("JournalEntries", JournalEntrySchema);
