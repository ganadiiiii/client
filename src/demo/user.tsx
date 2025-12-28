import type { Friend } from "../features/archive/hooks/useFriendsManager";

// 데모용 친구 목록 (5명)
export const demoFriends: Friend[] = [
    {
        id: "friend1",
        name: "Seolwhi",
        email: "seolwhi@palmful.com",
        isFriend: true,
        status: "accepted",
        profileImage: "",
    },
    {
        id: "friend2", 
        name: "Minjin",
        email: "minjin@palmful.com",
        isFriend: true,
        status: "accepted",
        profileImage: "",
    },
    {
        id: "friend3",
        name: "Hyeran",
        email: "hyeran@palmful.com", 
        isFriend: true,
        status: "accepted",
        profileImage: "",
    },
    {
        id: "friend4",
        name: "Jonghoon",
        email: "jonghoon@palmful.com",
        isFriend: true,
        status: "accepted", 
        profileImage: "",
    },
    {
        id: "friend5",
        name: "Junghwan",
        email: "junghwan@palmful.com",
        isFriend: true,
        status: "accepted",
        profileImage: "",
    },
    {
        id: "friend6",
        name: "Jeongwon",
        email: "jeongwon@palmful.com",
        isFriend: true,
        status: "accepted",
        profileImage: "",
    },
];

// 데모용 일반 유저 목록 (5명) - 친구 요청 가능한 사용자들
export const demoUsers: Friend[] = [
    {
        id: "user1",
        name: "Minho",
        email: "minho.song@example.com",
        isFriend: false,
        status: "none",
        profileImage: "",
    },
    {
        id: "user2",
        name: "Sohee",
        email: "sohee.han@example.com", 
        isFriend: false,
        status: "none",
        profileImage: "",
    },
    {
        id: "user3",
        name: "Taeyoung",
        email: "taeyoung.yoon@example.com",
        isFriend: false,
        status: "none", 
        profileImage: "",
    },
    {
        id: "user4",
        name: "Dahyun",
        email: "dahyun.kang@example.com",
        isFriend: false,
        status: "none",
        profileImage: "",
    },
    {
        id: "user5",
        name: "Chaeyoung",
        email: "chaeyoung.lim@example.com",
        isFriend: false,
        status: "none",
        profileImage: "",
    },
];

// 전체 유저 목록 (친구 + 일반 유저)
export const allDemoUsers: Friend[] = [...demoFriends, ...demoUsers];