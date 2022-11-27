import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideos = async (req, res, next) => {
  const video = new Video({
    userId: req.user.id,
    ...req.body,
  });
  try {
    const newVideo = await video.save();
    res.status(200).json(newVideo);
  } catch (err) {
    next(err);
  }
};


export const updateVideos = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video"));
    }
  } catch (err) {
    next(err);
  }
};
export const addToWatchLater = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
   
      const watchLaterVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(watchLaterVideo);
   
  } catch (err) {
    next(err);
  }
};


export const deleteVideos = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted");
    } else {
      return next(createError(403).json("You can delete only your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const getOwnVideos = async(req, res, next) => {
  try{
    const video = await Video.find({userId : req.user.id})
    res.status(200).json(video)
  }catch(err){
    console.log(err)
    next(err)
  }
}

export const getWatchLaterVideos = async(req, res, next) => {
  try{
    const video = await Video.find({watchLater : true})
    res.status(200).json(video)
  
     
  }catch(err){
    next(err)
  }
}

export const deleteAllVideos = async(req, res, next) => {
  try{
   await Video.remove({userId : req.params.userId})
    res.status(200).json("Your all videos are deleted!")
  }catch(err){
    next(err)
  }
}

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      {
        $sample: {
          size: 40,
        },
      },
    ]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const trendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const views = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json("Views has been increased");
  } catch (err) {
    next(err);
  }
};
export const subscriptionVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannel = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannel.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat());
  } catch (err) {
    next(err);
  }
};

export const findByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({
      tags: {   //looping inside an array
        $in: tags
      },
    });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const search = async (req, res, next) => {
  const que = req.query.que;
  try {
    const video = await Video.find({
      title : {$regex : que, $options : 'i'}
    })
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};


