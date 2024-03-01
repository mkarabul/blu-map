const ProfileTrip = require("../models/ProfileTrip");

const SocialPostController = {
  async setPostSocial(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({ where: { uuid } });
      if (!profileTrip) {
        return res.status(404).json({ error: "Post not found" });
      }
      profileTrip.isSocial = !profileTrip.isSocial;
      if (profileTrip.isSocial) {
        profileTrip.isPublic = true;
      }
      await profileTrip.save();
      res.status(200).json(profileTrip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = SocialPostController;
