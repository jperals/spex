<template>
  <div class="TopBar">
    <div class="BackIcon">
    </div>
    <span class="PageTitle">
    Story Title
    </span>
    <div class="Components"></div>
    <div class="Divider"></div>
    <div class="StoryIcon"></div>
    <div class="SystemIcon"></div>
    
  </div>
</template>

<style scoped lang="scss">

  .TopBar {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-bottom: 1px solid #707679;
    width: 100%;
    height: 64px;
    
    .BackIcon{
        width: 24px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/back.png");
        background-size: contain;
        background-image-padding-left: 16px;
        background-repeat: no-repeat;
        }


    .Components{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        padding-left: 16px;
        padding-right: 16px;
        margin: auto;
        background-image: url("../assets/icons/components.png");
        background-size: contain;
        background-repeat: no-repeat;
        }

    .PageTitle{
        flex-grow: 1;
        padding-left: 16px;
        font-size: 20px;
        color: #707679;
        line-height: 64px;
        vertical-align: middle;
        margin: auto;
        }

    .StoryIcon{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/story_Focus.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    .SystemIcon{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/system.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    .Divider{
        justify-content: flex-end;
        width: 1px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/divider.png");
        background-size: contain;
        background-repeat: no-repeat;
    }


  }

  
</style>
