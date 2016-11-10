// note: lists are stored by FireBase as maps with hashkeys
{
	'users' : {
		'user0': {
			'username': 'mattmerr',
			'robins' : ['robin0']
		},
		'user1': {
			'username': 'vroom',
			'robins': []
		}
	},
	'groups': {
		'group0': {
			'name': 'databois',
			'members': ['user1'],
			'robins': 'robin0'
		}
	},
	'robins': {
		'robin0': {
			'name': 'Lorem Ipsum',
			'desc': 'dolor sit amet'

			'players': ['user0', 'user1'],
			'shuffleseed': 1612,

			'sets': {
				'round1': {
					'user0': 'user1',
					'user1': 'user0'
				}
			},

			'results': {
				'round1': { 
					'user0': 'L',
					'user1': 'W'
				}
			}

			'canview': [
				'group0'
			],
			'canedit': {
				'user0'
			}
		}
	}
}