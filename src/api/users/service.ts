import UserModel, { UserDocument } from "./schema";
import { AbstractDataService } from "../../domain/abstracts";
import { User } from "../../domain/domains";

export class UsersService extends AbstractDataService<UserDocument> {
    constructor() {
        super(UserModel);
    }

    create = async (data: Partial<Omit<User, 'role'>>): Promise<UserDocument> => {
        const user = new this.model(data);
        await user.save();
        return user;
    }
}