const UserGroups = require("../models/UserGroups");
const GroupLedger = require("../models/GroupLedger");
const mongoose=require('mongoose');
const userCtrl = require("../controllers/user");

const GroupsCtrl = {
    fetchUserGroups: async (req, res, next) => {
        const user = new mongoose.Types.ObjectId(req.body.user);
        console.log(user);
        const userGroups = await UserGroups.findOne({user}).populate("groups");
        req.body.UserGroups = userGroups.groups;
        next();
    },
    fetchAmountInvestedInGroup: async (req, res, next) => {
        try{
            const user = new mongoose.Types.ObjectId(req.body.user);
            const {UserGroups} = req.body;
            var group_ids = [];
            console.log("body: " + JSON.stringify(req.body));
            for(let i in UserGroups){
                console.log("i: " + i)
                group_ids.push(new mongoose.Types.ObjectId(UserGroups[i]._id));
                ///const id = new mongoose.Types.ObjectId(UserGroups[i]._id);
            }
            console.log(group_ids);
            console.log(user);
            const transactionData = await GroupLedger.find({
                group: {$in: group_ids},
                $or: [
                    {paidby: user},
                    {owedby: user}
                ]
            }).populate({path: "paidby owedby", select: "username"});
            console.log("transactionData: " + transactionData);
            totalAmount = 0;
            for(i in transactionData){
                //console.log(i);
                if(transactionData[i].paidby._id.equals(user)){
                    totalAmount += transactionData[i].amount;
                }else{
                    totalAmount -= transactionData[i].amount;
                }
            }
            console.log("totalAmount: " + totalAmount);
            var response = {}
            response.UserGroups = req.body.UserGroups;
            response.totalAmount = totalAmount;
            res.json({response});
        }catch(e){
            console.log(e);
        }
        
    }
}

module.exports = GroupsCtrl;