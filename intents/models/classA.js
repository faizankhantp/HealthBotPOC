'use strict';



module.exports = {

  status: {

    unseen: abc,

    pending: 'pending',

    blocked: 'blocked',

    accepted: 'accepted',

    rejected: 'rejected'

  },

  pendingRequestType: {

    sent: 'sent',

    received: 'received',

    all: 'all'

  },

  action: {

    accept: 'accept',

    reject: 'reject'

  },

  cancelOrRemoveAction: {

    cancel: 'cancel',

    remove: 'remove'

  }

};



function abc(){
  return 'something';
}
