# Software Design

## Design Approach

We use a mix of the top-down and bottom-up design approaches, where the design of the top-most levels is determined first. The design of these top layers is documented below.

## Use Case

```mermaid
flowchart LR
    U{User}
    U-->T1
    U-->T2
    U-->T3
    U-->T4
    U-->P1
    U-->Q1
    U-->Q2
    U-->S1
    U-->S2
    U-->A1
    subgraph app [RPGym App]
        direction LR
        A1([Sign up/Log in])
        T1([Log Workout])
        T2([View Workout History])
        T3([Add Custom Exercise])
        T4([Track Exercise])
        P1([Customize Profile])
        Q1([Set Goals/Create Quest])
        Q2([Do Quests])
        S1([Join Party])
        S2([Do Campaign])
    end
```

## Object Oriented Domain Model

```mermaid
classDiagram
    direction LR

    class User {
        settings
        userAccount
        userProfile
        userExercise
    }

    class Settings

    class UserAccount {
        id
        username
        emailAddress
        password
    }

    class UserExercise {
        customExercises
        workoutPresets
        workouts
        createPreset()
        createRoutine()
    }

    class Routine {
        name
        description
        workouts
        addWorkoutTemplate()
    }

    class Workout {
        startDateTime
        endDateTime
        exercises
        addExercise()
    }

    class WorkoutPreset {
        name
        description
    }

    class Exercise {
        exerciseTemplate
        sets
        addSet()
    }

    class ExerciseTemplate {
        name
        category
        notes
    }

    class Set {
        notes
        perceivedExertion
    }
    <<Abstract>> Set

    class WeightRepsSet {
        weight
        weightUnit
        reps
    }

    class WeightTimeSet {
        weight
        weightUnit
        reps
    }

    class WeightUnit {
        kg
        lb
    }
    <<Enumeration>> WeightUnit

    class UserProfile {
        displayName
        bio
        maxHealth
        currentHealth
        exp
        party
        quests
        items
    }

    class Quest {
        name
        description
        maxProgress
        currentProgress
        startDateTime
        endDateTime
    }

    class QuestPreset {
        name
        description
        maxProgress
        currentProgress
        startDateTime
        endDateTime
    }


    class Party {
        name
        members
        ongoingCampaign
        addMember()
        removeMember()
        addCampaign()
    }

    class Campaign {
        campaignTemplate
        currentBossHealth
    }

    class CampaignTemplate {
        bossName
        bossImage
        description
        bossMaxHealth
        difficultyMultiplier
    }

    class Avatar {
        avatarBase
        avatarEquipment
    }

    class AvatarBase {
        bodySize
        skinColor
        hairColor
        frontHair
        backHair
        facialHair
        glasses
        background
    }

    class BodySize
    class SkinColor
    class HairColor
    class FrontHair
    class BackHair
    class FacialHair
    class Glasses
    class Background
    <<Enumeration>> BodySize
    <<Enumeration>> SkinColor
    <<Enumeration>> HairColor
    <<Enumeration>> FrontHair
    <<Enumeration>> BackHair
    <<Enumeration>> FacialHair
    <<Enumeration>> Glasses
    <<Enumeration>> Background

    class AvatarEquipment {
        helmet
        chestplate
        leggings
        boots
        mainHandItem
        offHandItem
    }

    class Item {
        spriteImage
    }
    <<Abstract>> Item

    class Helmet
    class Chestplate
    class Leggings
    class Boots
    class MainHandItem
    class OffHandItem

    User "1" *-- "1" UserAccount : has
    User "1" o-- "1" Settings : sets
    User "1" *-- "1" UserExercise : has
    User "1" *-- "1" UserProfile : has

    UserExercise "1" o-- "*" Workout : tracks
    UserExercise "1" o-- "*" Routine : can create
    WorkoutPreset "*" o-- "1" Routine : part of
    Workout <|-- WorkoutPreset : based on
    Workout "1" o-- "*" Exercise : has

    UserExercise "1" o-- "*" ExerciseTemplate : can create
    Exercise "*" *-- "1" ExerciseTemplate : based on
    Exercise "1" *-- "*" Set : has
    Set <|-- WeightRepsSet
    Set <|-- WeightTimeSet
    Set "*" *-- "1" WeightUnit

    UserProfile "1" o-- "*" Quest : creates, does
    UserProfile "1..20" --o "1" Party : part of
    Party "1" o-- "0..1" Campaign : does
    Campaign "1" *-- "*" CampaignTemplate : based on

    UserProfile "1" o-- "*" Item : has
    Item <|-- Helmet
    Item <|-- Chestplate
    Item <|-- Leggings
    Item <|-- Boots
    Item <|-- MainHandItem
    Item <|-- OffHandItem

    UserProfile "1" *-- "1" Avatar : has
    Avatar "1" *-- "1" AvatarBase : part of
    Avatar "1" *-- "1" AvatarEquipment : part of

    AvatarBase "*" *-- "1" BodySize
    AvatarBase "*" *-- "1" SkinColor
    AvatarBase "*" *-- "1" HairColor
    AvatarBase "*" *-- "1" FrontHair
    AvatarBase "*" *-- "1" BackHair
    AvatarBase "*" *-- "1" FacialHair
    AvatarBase "*" *-- "1" Glasses
    AvatarBase "*" *-- "1" Background

    AvatarEquipment "0..1" *-- "1" Helmet
    AvatarEquipment "0..1" *-- "1" Chestplate
    AvatarEquipment "0..1" *-- "1" Leggings
    AvatarEquipment "0..1" *-- "1" Boots
    AvatarEquipment "0..1" *-- "1" MainHandItem
    AvatarEquipment "0..1" *-- "1" OffHandItem
```

## Software Architecture

```mermaid
flowchart LR
    subgraph users [Users]
       u([Users])
       testers([E2E Testers])
       end

    subgraph app [App]
        view["`
            **View**
            React Native/Expo
            TypeScript
        `"]
        controller["`
            **Controller**
            React Native/Expo
            TypeScript
            Firebase API
        `"]
        model["`
            **Model**
            React Native/Expo
            TypeScript
            Firebase API
        `"]
        nav["`
            **Router**
            React Native/Expo
            Expo Router
            TypeScript
        `"]
        end

    subgraph cloud [Cloud]
        db[(Firebase\nCloud Firestore)]
        auth[Firebase\nAuthentication]
        end

    users<--interact-->controller
    users--displays-->view
    nav<--routes-->view
    view--action-->controller
    model--update-->view
    controller--update-->model
    auth<--auth-->controller
    model<--update-->db
```

### Model-View-Controller

We use the Model-View-Controller (MVC) design pattern to separate presentation code and logic code, in order to make the codebase easier to test and maintain.
