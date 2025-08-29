// 그룹 내 멤버 타입
export type GroupMember = {
  memberId: number; // 멤버 고유 ID
  name: string; // 멤버 이름
  // 필요하다면 role, profileImageUrl 같은 필드 추가
};

// 그룹 전체 정보 타입
export type GroupInfo = {
  groupId: number; // 그룹 ID
  groupName: string; // 그룹 이름
  inviteCode: string; // 초대 코드
  members: GroupMember[]; // 그룹 멤버 리스트
};
