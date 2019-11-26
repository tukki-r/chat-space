# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|option|
|------|----|------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|

### アソシエーション
  - has_many :messeages
  - has_many :group_user
  - has_many :groups, through: :groups_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### アソシエーション
  - has_many :messeages
  - has_many :group_user
  - has_many :users, through: :groups_users

## messeageテーブル
  |Column|Type|Options|
  |------|----|-------|
  |text|text||
  |image|text||
  |date|datetime|
  |user_id|integer|null: false, foreign_key: true|

  
### アソシエーション
  - beling_to :user
  - beling_to :group

## group_userテーブル

|Column|Type|option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to: group
- belong_to: user
