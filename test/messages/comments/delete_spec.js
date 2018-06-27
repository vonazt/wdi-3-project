/* global describe, it, api, expect, beforeEach,   */
const Message = require('../../../models/message');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = [
  {
    username: 'richard',
    email: 'richard@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://www.panzerdragoonlegacy.com/system/pictures/1517/original/azel-panzer-dragoon-rpg-ntsc-j-version-case-back-insert-enhanced.jpg?1483099400'
  },
  {
    username: 'martin',
    email: 'martin@test.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    avatar: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_405,q_auto:eco,w_600/https://inews.co.uk/wp-content/uploads/2017/05/GamesMaster-main.jpg'
  }
];

const commentData = {
  content: 'test-text'
};

let userOneId;
let userTwoId;
let token;
let messageId;
let messageData= {
  userOneId: userOneId,
  userTwoId: userTwoId,
  comments: [{ content: 'test' }]
};
let commentId;

describe('DELETE /messages/:id/comments', () => {
  beforeEach(done => {
    User
      .remove({})
      .then(() => Message.remove({}))
      .then(() => User.create(userData[0]))
      .then( user => {
        userOneId = user._id;
      })
      .then(() => User.create(userData[1]))
      .then( user => {
        userTwoId = user._id;
        token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      })
      .then(() => Message.create({
        userOneId: userOneId,
        userTwoId: userTwoId,
        comments: [{ content: 'test' }]
      }))
      .then((message) => {
        messageData.userOneId = message.userOneId;
        messageData.userTwoId = message.userTwoId;
        messageId = message._id;
        commentId = message.comments[0]._id;
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.delete(`/api/messages/${messageId}/comments/${commentId}`)
      .end((err, res) =>{
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200', done => {
    api.delete(`/api/messages/${messageId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) =>{
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return no data', done => {
    api.delete(`/api/messages/${messageId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.comments).to.be.empty;
        done();
      });
  });
});
