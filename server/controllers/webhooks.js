import  {Webhook} from 'svix'
import User from '../models/user.model.js'


//api comntroller for clerk user 
export const clerkWebhooks = async (req,res) => {
    try {
        // create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // verify the webhook
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        })

        // get the payload
        const {data, type } = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id : data.id,
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                    resume : ""
                }

                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                }

                await User.findOneAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default: {
               break;
            }
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Webhook Error" + error.message})
    }
}