import isRecordOwner from '../../functions/isRecordOwner.js';

function CollectionsIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then((res) => {
      $scope.records = res.data;
      isRecordOwner(res, $auth);
    });
}

export default CollectionsIndexCtrl;
