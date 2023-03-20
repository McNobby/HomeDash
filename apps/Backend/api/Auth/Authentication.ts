import bcrypt from 'bcrypt'
import User, { iUser } from '../../schemas/UserSchema.js'
import jwt from 'jsonwebtoken'
import iToken from './iToken.js';

export default class Authentication {

    private jwt;
    private bcrypt;
    protected user;
    protected userId: string | undefined;

    constructor() {
        this.bcrypt = bcrypt;
        this.user = User
        this.jwt = jwt;
    }


    /**
     * Creates a new JWT
     * @param userId User ID
     * @returns A Json Web Token
     */
    protected createJWT(userId: string): string{        
        return this.jwt.sign(<iToken>{userId: userId},
            <string>process.env.JWT_SECRET, 
            {
                expiresIn: '7d',
                algorithm: 'HS512',
            });
    }

    
    /**
     * Verifies a JWT
     * @param token JWT
     * @returns true if token is valid, false if not
     */
    public async verifyAndDecodeJWT(token: string|undefined): Promise<boolean> {
        if(!token || token === 'undefined') {
            return false;
        }

        try {
            const decoded = this.jwt.verify(token, <string>process.env.JWT_SECRET) as iToken;
            this.userId = decoded.userId;

            let user = await this.getUserById()

            return decoded.passwordUpdated === user?.passwordUpdated;

        } catch ({message}) {
            console.log("Error in jwt auth: ", message)
            return false;
        }

    }


    protected async getUserById(): Promise<iUser|null> {
        if (this.getUserId()) {
            return await this.user.findById(this.getUserId())
        }
        return null;
    }


    /**
     * Hashes a password
     * @param password Password to hash
     * @returns hashed password
     */
    protected hashPassword(password: string): string {
        let salt = this.bcrypt.genSaltSync(10)
        return this.bcrypt.hashSync(password, salt);
    }


    /**
     * Checks if a password matches a hash
     * @param password Unhashed password
     * @param hash Hashed password
     * @returns true if password matches hash, false if not
     */
    protected passwordMatches(password: string, hash: string): boolean {
        return this.bcrypt.compareSync(password, hash);
    }


    /**
     * gets the user ID
     * Make sure to call verifyAndDecodeJWT() first to set the user ID
     * @returns User ID if user is logged in, false if not
     */
    public getUserId(): string|boolean {
        if(!this.userId){
            return false;
        }

        return this.userId;
    }


    /**
     * 
     * @returns true if user is admin, false if not
     */
    protected async isAdministrator(): Promise<boolean> {
        if(!this.userId) {
            return false;
        }

        let user = await this.user.findById(this.userId);
        if(!user) {
            return false;
        }

        return user.username === process.env.ADMIN_USERNAME;
    }


    /**
     * 
     * @returns true if admin exists, false if not
     */
    private async doesAdminExist(): Promise<boolean> {
        return !!await this.user.exists({username: process.env.ADMIN_USERNAME||'admin'});
    }


    public async createAdminIfNotAlreadyExisting(): Promise<void> {

        if(await this.doesAdminExist()) {
            console.log('Found admin');
            
            return;
        }

        try{
            console.log('Admin user not found, Creating admin');
            
            let admin = new this.user({
                username: process.env.ADMIN_USERNAME || 'admin',
                password: this.hashPassword(process.env.ADMIN_PASSWORD||'admin'),
                passwordUpdated: new Date(),
            })

            await admin.save();
            console.log('Admin created');
            
        }
        catch(err) {
            console.log('Unable to create admin! ', err);
        }
    }


}