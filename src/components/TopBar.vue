<template>
  <div class="TopBar">
    <div class="BackIcon">
    </div>
    <span class="PageTitle">
    Story Title
    </span>
    <suggestions-indicator number-of-suggestions="2"></suggestions-indicator>
    
    <div class="tooltip">
    <div class="Components"></div>
    <span class="tooltiptext">Components</span>
    </div>
    
    <div class="Divider"></div>
    <div class="tooltip">
    <div class="StoryIcon"></div>
    <span class="tooltiptext">Story</span>
    </div>

    <div class="tooltip">
    <div class="SystemIcon"></div>
    <span class="tooltiptext">System</span>
    </div>
    
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
        background-image: url("../assets/icons/back.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
        }


    .Components{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-image: url("../assets/icons/components.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        }

    .PageTitle{
        flex-grow: 1;   
        font-size: 20px;
        color: #707679;
        line-height: 32px;
        vertical-align: middle;
        margin-top: 16px;
        margin-bottom: 16px;
        font-family: TitilliumWeb-Regular;
        }

    .StoryIcon{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/story_Focus.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .SystemIcon{
        justify-content: flex-end;
        width: 24px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/system.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .Divider{
        justify-content: flex-end;
        width: 1px;
        height: 24px;
        margin: auto;
        background-image: url("../assets/icons/divider.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 4px;
        margin-right: 4px;
        margin-top: 20px;
        margin-bottom: 20px;
    }



    /* Tooltip container */
    .tooltip {
        position: relative;
        display: inline-block;
        }

    /* Tooltip text */
        .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
        margin-left: -32px;
        background-color: #031B26;
        color: #fff;
        font-family: TitilliumWeb-Regular; 
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
    
    /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
        }

    /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .tooltip .tooltiptext::after {
        content: " ";
        position: absolute;
        bottom: 100%;  /* At the top of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
        }
  }

  
</style>
