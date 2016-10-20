(function(){

  app.controller('modalController', function ($uibModal, $log, $document) { 
 console.log('in the modal controller');

  var modalCtrl = this;
  modalCtrl.items = ['item1', 'item2', 'item3'];

  modalCtrl.animationsEnabled = true;

  modalCtrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      
    var modalInstance = $uibModal.open({
      animation: modalCtrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'modalCtrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return modalCtrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      modalCtrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}); //end modalController

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var modalCtrl = this;
  modalCtrl.items = items;
  modalCtrl.selected = {
    item: modalCtrl.items[0]
  };

  modalCtrl.ok = function () {
    $uibModalInstance.close(modalCtrl.selected.item);
  };

  modalCtrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

})();