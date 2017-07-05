 var activityController = require('../controller/activityController');
var Verify    = require('./verify');

 module.exports = function(socket,io){

   // for search
  	socket.on('search', function(data) {
  		Verify.verifySocketUser(data.token,function(procced){
  			if(procced){
  					    activityController.searchFor(data.userId,data.name,function(result){
						return io.to(socket.id).emit("searchresult", result);
					});
  			}
  			else
  			{
  				return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
  			}
  		});

    });
  	// for follow a user
  	socket.on('follow',function(data){
  		Verify.verifySocketUser(data.token,function(procced){
  			if(procced){
  					    activityController.followHim(data.followerId,data.followingId);
  						}
  			else
  			{
  				return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
  			}
  		});
  		
  	});
  	// for unfollow a user
  	socket.on('unfollow',function(data){
  		Verify.verifySocketUser(data.token,function(procced){
  			if(procced){
  					    activityController.unfollowHim(data.followerId,data.followingId);
  						}
  			else
  			{
  				return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
  			}
  		});
  		
  	});
  	// for post a blog
  	socket.on('postblog',function(data){
  		Verify.verifySocketUser(data.token,function(procced){
  			if(procced){
  					    activityController.postblogs(data.ownerId,data.title,data.body,function(msg){
  					    		return io.to(socket.id).emit("replypost",msg);
  					    	});
  						}
  			else
  			{
  				return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
  			}
  		});
  	});

// to collect the posts
  	socket.on('gatherposts',function(data){
  		Verify.verifySocketUser(data.token,function(procced){
  			if(procced){
  					    activityController.postpacking(data.userId,function(error,allPost){
  					    		if(error)
  					    			return io.to(socket.id).emit("gatheredpost","Server Error");
  					    		else
  					    			return io.to(socket.id).emit("gatheredpost",allPost);
  					    	});
  						}
  			else
  			{
  				return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
  			}
  		});
  	});

    socket.on('interestInsert',function(data){
      Verify.verifySocketUser(data.token,function(procced){
        if(procced){
                activityController.insertInterest(data.userId,data.postId,data.interest);
              }
        else
        {
          return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
        }
      });
    });

//update inters
    socket.on('interestUpdate',function(data){
      Verify.verifySocketUser(data.token,function(procced){
        if(procced){
                activityController.updateInterest(data.userId,data.postId,data.interest);
              }
        else
        {
          return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
        }
      });
    });

//delete interest
    socket.on('interestDelete',function(data){
      Verify.verifySocketUser(data.token,function(procced){
        if(procced){
                activityController.deleteInterest(data.userId,data.postId);
              }
        else
        {
          return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
        }
      });
    });


    socket.on('NewComment',function(data){
      Verify.verifySocketUser(data.token,function(procced){
        if(procced){
                activityController.insertComment(data.userId,data.postId,data.comment,function(msg){
                    return io.to(socket.id).emit("ReplyComment",msg);
                });
              }
        else
        {
          return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
        }
      });
    });



    socket.on('reportPost',function(data){
      Verify.verifySocketUser(data.token,function(procced){
        if(procced){
                activityController.reportPost(data.userId,data.postId,data.reason,function(msg){
                    return io.to(socket.id).emit("ReplyReport",msg);
                });
              }
        else
        {
          return io.to(socket.id).emit("AuthorizationFailed","Authorization Failed");
        }
      });
    });



   	socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

}