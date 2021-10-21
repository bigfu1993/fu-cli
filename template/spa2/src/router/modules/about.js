import Member from '@/views/about/member'
let aboutModule = [
	{
		path: 'member/:name',
		component: Member,
		meta: {
			title: '团队成员'
		}
	}
]
export default aboutModule
