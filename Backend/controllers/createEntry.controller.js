import User from "../models/user.model.js";
import { analyzeMood } from "../utils/analyzeMood.js";


export const createEntry = async (req, res) => {
    const { text } = req.body;
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = analyzeMood(text);

        user.journal.push({
            text,
            mood: result.mood,
            moodScore: result.score,
        });

        await user.save();

        res.status(201).json({
            message: "Journal entry created and linked to user successfully",
            entry,
        });

    } catch (error) {
        console.error("Error creating entry:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};