import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  description: string;

  @Column({ default: false })
  @IsBoolean()
  isExplainable: boolean;
}
/*
ALTER TABLE nestjs_airbnb_dev.rule AUTO_INCREMENT = 1;
INSERT INTO nestjs_airbnb_dev.rule (title, isExplainable)
VALUES 
('어린이(2~12세) 숙박에 적합함', true, 숙소 내 시설 중 어린이에게 위험하거나 파손의 위험이 있는 건 무엇인가요?),
('유아(2세 미만) 숙박에 적합함', true, 숙소 내 시설 중 유아에게 위험하거나 파손의 위험이 있는 건 무엇인가요?),
('반려동물 동반에 적합함', false),
('흡연 가능', false),
('이벤트 허용', false);
*/

@Entity()
export class RuleChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  isOkay: boolean;

  @Column({ nullable: true })
  @IsString()
  description: string;

  @ManyToOne(type => Rule)
  rule: Rule;

  @ManyToOne(type => Room)
  room: Room;
}

@Entity()
export class CustomRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @ManyToOne(type => Room)
  room: Room;
}

//===============================

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;
}
/*
ALTER TABLE nestjs_airbnb_dev.detail AUTO_INCREMENT = 1;
INSERT INTO nestjs_airbnb_dev.detail (title, description)
VALUES 
('계단을 올라가야 함','계단에 관해 설명하세요(예시: 계단 층수) '),
('소음이 발생할 수 있음','소음의 정도 및 발생할 수 있는 시간대에 관해 설명하세요'),
('숙소에 반려동물 있음','반려동물에 관해 설명하세요 '),
('건물 내 주차 불가','숙소 주변 주차 상황에 관해 설명하세요 '),
('일부 공용 공간 있음','게스트가 공유할 공간에 관해 설명하세요 '),
('편의시설 제한','불안정한 무선인터넷, 온수 제한 등 편의시설이나 서비스 제한에 대해 설명하세요 '),
('숙소에 감시 또는 녹화 장치 설치','동영상, 오디오 또는 사진을 녹화, 녹음 또는 전송할 수 있는 기기가 있다면 알려주세요. 각 기기의 위치와 켜짐/꺼짐 여부를 명시해주세요. '),
('숙소에 무기 있음','무기(화기, 공기총, 전기충격기 등)가 있다면 그 위치 및 보관 방식에 대해 알려주세요 '),
('숙소에 위험한 동물 있음','게스트나 다른 동물의 건강 또는 안전에 위협이 될 수 있는 길들여진 동물이나 야생동물이 있다면 알려주세요 ');
*/

@Entity()
export class DetailChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  explain: string;

  @ManyToOne(type => Detail)
  detail: Detail;

  @ManyToOne(type => Room)
  room: Room;
}
