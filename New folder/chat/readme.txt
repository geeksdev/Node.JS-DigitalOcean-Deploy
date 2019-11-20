==>for mqtt message channal name

1) ConactSync/_id : to post Conact (active Conact).
2) UserUpdate/1 : Social Status Update.
3) UserUpdate/2 : Profile Update.
4) UserUpdate/3 : Any of Join From Active conatct.
5) UserUpdate/4 : Put Conact - as response.
6) UserUpdate/5 : Delete Conact - as response.

Response of mqtt chanal "ConactSync/_id" data should be :
[{
    localNumber :"value",
    number:"value",
    profilePic:"value"
    socialStatus : "value",
    _id :"Mongo Object Id" 
}]

==>Save Data in mongo & elastic search , when user send a message/audio-video calling
data should save :
/* 1 */
{
    "_id" : ObjectId("5972fb9609bd9a4590cbdc22"),
    "userId" : ObjectId("59721f4605abd140604e9e04"),
    "date" : 1234567890,
    "messageLogs" : {
        "text" : 50,
        "gif" : 20,
        "image" : 10,
        "video" : 5,
        "document" : 10
    },
    "callLogs" : {
        "receivedCall" : 15,
        "initiatCall" : 20,
        "receivedVideoCall" : 20,
        "initiatVideoCall" : 10
    },
    "receivedAudioCall" : [ 
        {
            "userId" : ObjectId("59721f4605abd140604e9e05"),
            "mins" : 10
        }, 
        {
            "userId" : ObjectId("59721f4605abd140604e9e06"),
            "mins" : 50
        }
    ],
    "initiatAudioCall" : [ 
        {
            "userId" : ObjectId("59721f4605abd140604e9e07"),
            "mins" : 10
        }, 
        {
            "userId" : ObjectId("59721f4605abd140604e9e08"),
            "mins" : 50
        }
    ],
    "initiatVideoCall" : [ 
        {
            "userId" : ObjectId("59721f4605abd140604e9e09"),
            "mins" : 10
        }, 
        {
            "userId" : ObjectId("59721f4605abd140604e9e11"),
            "mins" : 50
        }
    ],
    "initiatVideoCall" : [ 
        {
            "userId" : ObjectId("59721f4605abd140604e9e12"),
            "mins" : 10
        }, 
        {
            "userId" : ObjectId("59721f4605abd140604e9e13"),
            "mins" : 50
        }
    ]
}




{type 0:Call initiate} ok 
{type 1: accept}  ok
{type 2: reject by receiver}  ok
{type 3: noanswer by reeciver} ok
{type 5:start video} ok
{type 6: stop video}
{type 7:timeout on caller side(no response within 60 sec)}





