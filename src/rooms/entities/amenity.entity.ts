import { IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class AmenityGroup extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @OneToMany(
    type => AmenityItem,
    amentity => amentity.group,
  )
  amennities: AmenityItem[];
}
/*
INSERT INTO nestjs_airbnb_dev.amenitiy_group (name)
VALUES 
('욕실'), 
('침실 및 세탁 시설'), 
('엔터테인먼트'), 
('냉난방'), 
('숙소 안전'), 
('인터넷 및 사무 공간'), 
('주방 및 식당'), 
('위치 특성'), 
('주차장 및 주차 시설'), 
('서비스');
*/

@Entity()
export class AmenityItem extends CoreEntity {
  @ManyToOne(
    type => AmenityGroup,
    amenitiesGroup => amenitiesGroup.amennities,
  )
  group: AmenityGroup;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  description: string;

  @ManyToMany(
    type => Room,
    room => room.amenities,
  )
  rooms: Room[];
}

/*
INSERT INTO nestjs_airbnb_dev.AmenityItem (groupId, name, description)
VALUES 
(1, '헤어드라이어', null), 
(1, '샴푸', null), 
(2,'건조기', null), 
(2,'다리미', null), 
(2,'옷걸이', null), 
(2,'필수품목', '수건, 침대시트, 비누, 화장지'), 
(2,'세탁기',null), 
(3,'TV',null), 
(4,'실내 벽난로',null), 
(4,'난방',null), 
(4,'에어컨',null), 
(5,'숙소 내 보안 카메라',null), 
(5,'일산화탄소 경보기',null), 
(5,'소화기',null), 
(5,'화재경보기',null), 
(5,'구급 상자',null), 
(6,'무선 인터넷', '숙소 전체에서 사용 가능'), 
(6,'업무 전용 공간',null), 
(7,'주방', '게스트가 요리를 할 수 있는 공간'), 
(8,'게스트 전용 출입문', '별도의 출입로 또는 건물 입구'), 
(9,'건물 내 무료 주차',null), 
(9,'수영장',null), 
(9,'헬스장',null), 
(9,'자쿠지',null), 
(10,'아침식사', '아침 식사 제공');
*/
