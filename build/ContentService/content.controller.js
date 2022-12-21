"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailController = exports.UpdateJournalEntryController = exports.CreateJournalEntryController = void 0;
async function CreateJournalEntryController(request, reply) {
    const { userId } = request.user;
    const { JournalEntryModel } = request.db.models;
    const newEntry = {
        title: request.body.title,
        content: request.body.content,
        date: request.body.date,
        userIds: request.body.userIds,
    };
    if (!newEntry.userIds.includes(userId)) {
        newEntry.userIds.push(userId);
    }
    const journalEntry = await JournalEntryModel.create(newEntry);
    return await reply.status(201).send(journalEntry);
}
exports.CreateJournalEntryController = CreateJournalEntryController;
async function UpdateJournalEntryController(request, reply) {
    const { JournalEntryModel } = request.db.models;
    const { userId } = request.user;
    const entryExists = await JournalEntryModel.findById(request.body._id);
    if (entryExists === null) {
        return await reply
            .status(404)
            .send(`No entry was found with id ${request.body._id}!`);
    }
    if (!entryExists.userIds.includes(userId)) {
        return await reply
            .status(403)
            .send("You do not have access to this entry!");
    }
    const updatedEntry = await JournalEntryModel.findByIdAndUpdate(request.body._id, request.body, { new: true });
    return await reply.status(200).send(updatedEntry);
}
exports.UpdateJournalEntryController = UpdateJournalEntryController;
async function GetUserByEmailController(request, reply) {
    const { UserModel } = request.db.models;
    const foundUser = await UserModel.findOne({ email: request.params.email });
    if (foundUser === null) {
        return await reply.status(404).send("User not found!");
    }
    return await reply.status(200).send({
        email: foundUser.email,
        userId: foundUser._id,
    });
}
exports.GetUserByEmailController = GetUserByEmailController;
