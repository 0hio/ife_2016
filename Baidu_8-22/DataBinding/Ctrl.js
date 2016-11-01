var log = function (value) {
	return console.log(value);
}


angular.module("app", []).controller("ctrl", function ($scope) {
	$scope.name = "";
	$scope.age = "";
	$scope.sex = "Male"
	$scope.height = "";
	$scope.weight = "";
	$scope.isEdit = false;
	$scope.isRepeat = false;
	var integer = /^[1-9][0-9]*$/;

	$scope.users = [
	{id:1, name:'Sharlock', age:"20", sex:"Male", height: "180", weight:"80" },
	{id:2, name:'Warsh', age:"20", sex:"Male", height: "165", weight:"70" },
	{id:3, name:'Summer', age:"20", sex:"Famale", height: "170", weight:"58" },
	{id:4, name:'Jess', age:"35", sex:"Famale", height: "180", weight:"90" }
	];


	$scope.edit = function (id) {
		$scope.isEdit = true;
		$scope.notAllowed = "not-allowed";
		//log(id)
		for (i in $scope.users) {
			if ($scope.users[i].id === id) {
				$scope.name = $scope.users[i].name;
				$scope.age = $scope.users[i].age;
				$scope.sex = $scope.users[i].sex;
				$scope.height = $scope.users[i].height;
				$scope.weight = $scope.users[i].weight;
			}
		}
	}

	$scope.submit = function () {
		if ($scope.isEdit === true) {
			
			for (i in $scope.users) {
				if ($scope.users[i].name == $scope.name) {
					//log($scope.users[i].age)
					$scope.users[i].name = $scope.name;
					$scope.users[i].age = $scope.age;
					$scope.users[i].sex = $scope.sex;
					$scope.users[i].height = $scope.height
					$scope.users[i].weight = $scope.weight;
				}
					
			}  
			$scope.name = "";
			$scope.age = "";
			$scope.sex = "Male";
			$scope.height = "";
			$scope.weight = "";
			$scope.isEdit = false;
			$scope.notAllowed = "del";

		} else if ($scope.isEdit === false) {
			for (i in $scope.users) {
				
				if ($scope.users[i].name === $scope.name) {
					$scope.isRepeat = true;
					return;
				}
			}

			$scope.users.push($scope.newMember($scope.name, $scope.age
			, $scope.sex, $scope.height, $scope.weight));
			$scope.name = "";
			$scope.age = "";
			$scope.sex = "Male"
			$scope.height = "";
			$scope.weight = "";
		}
		
	}

	$scope.delUser = function (id) {
		if ($scope.isEdit == true) {
			return;
		} else {
			for (i in $scope.users) {
				if ($scope.users[i].name === id) {
					$scope.users.splice(i, 1);
				}
			}
		}
	}

	$scope.newMember = function (iname, iage, isex, iheight, iweight) {
		return {id: $scope.users[$scope.users.length-1].id+1, name: iname, age: iage, sex: isex, height: iheight, weight: iweight}
	}

	$scope.$watch("name", function () {
		if ($scope.name.trim().length == 0) {
			$scope.error = true;
			$scope.nameBe = false;
		} else {
			$scope.error = false;
			$scope.nameBe = true;
			$scope.isRepeat = false;
		}
	})

	$scope.$watch("age", function () {
		if (integer.test($scope.age)) {
			
			$scope.error = false;
			$scope.ageBe = true;
		} else {	
			$scope.error = true;
			$scope.ageBe = false;
		}
	})
	$scope.$watch("weight", function () {
		if (integer.test($scope.weight)) {
			
			$scope.error = false;
			$scope.weightBe = true;
		} else {
			$scope.error = true;
			$scope.weightBe = false;
		}
		
	})
	$scope.$watch("height", function () {
		if (integer.test($scope.height)) {
			
			$scope.error = false;
			$scope.heightBe = true;
		} else {		
			$scope.error = true;
			$scope.heightBe = false;
		}
	})

	$scope.check = function () {
		if ($scope.nameBe && $scope.ageBe 
			&& $scope.heightBe && $scope.weightBe) {
			return false;
		} else {
			return true;
		}
	}

	
})


$(document).ready(function(){
    $(window).scroll(function(event){
        
	    var followTop = $(window).scrollTop()+250;
	    log(followTop)
        $(".right").css({"top": followTop+"px"})

        
    	
    });
});















