/*
 * Copyright (c) 2022 HiSilicon (Shanghai) Technologies CO., LIMITED.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <hi_time.h>
#include <hi_watchdog.h>
#include "iot_errno.h"
#include "iot_gpio.h"
#include "cmsis_os2.h"
#include "ohos_init.h"
#include "iot_log.h"
#include "iot_main.h"
#include "iot_profile.h"

#define IOT_GPIO_INDEX_10 10 // GPIO10控制上下
#define IOT_GPIO_INDEX_11 11 // GPIO11控制旋转
#define TASK_SLEEP_1000MS (1000)
#define HIGH_T_NEGATIVE 700

void circleup(int high_t, int n)
{
    for (int i = 0; i < n; i++)
    {
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_10, 0);
        hi_udelay(500);
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_10, 1);
        hi_udelay(high_t);
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_10, 0);
        hi_udelay(20000 - high_t - 500);
    }
}

void circleturn(int high_t, int n)
{
    for (int i = 0; i < n; i++)
    {
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_11, 0);
        hi_udelay(500);
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_11, 1);
        hi_udelay(high_t);
        IoTGpioSetOutputVal(IOT_GPIO_INDEX_11, 0);
        hi_udelay(20000 - high_t - 500);
    }
}

// 舵机控制推动函数, GPIO 10
void ControlUP(void *arg)
{
    (void)arg;
    int t = 10000 * 100; // 1s
    circleup(1250, 50);
    hi_udelay(0.5 * t);
    circleup(500, 50);
    hi_udelay(3 * t);
}

// 根据编码控制舵机
void CodeControl(int *code)
{
    int t = 10000 * 100; // 1s
    int len = 4;
    for (int i = 0; i < len; i++)
    {
        if (code[i] == 1)
        {
            ControlUP(NULL);
        }
        if (i == 0)
        {
            circleturn((i + 2) * HIGH_T_NEGATIVE - 70, 50);
            hi_udelay(2 * t);
        }
        if (i == 1)
        {
            circleturn((i + 2) * HIGH_T_NEGATIVE - 470, 50);
            hi_udelay(2 * t);
        }
        if (i == 2)
        {
            circleturn((i + 2) * HIGH_T_NEGATIVE - 490, 50);
            hi_udelay(2 * t);
        }
        if (i == 3)
        {
            circleturn((i + 2) * HIGH_T_NEGATIVE - 620, 50);
            hi_udelay(2 * t);
        }
    }
}

// 回调函数处理云端消息
static void TrafficLightMsgRcvCallBack(char *payload)
{
    IOT_LOG_DEBUG("PAYLOAD:%s\r\n", payload);
    int *code;
    if (strstr(payload, "ServoControl") != NULL)
    {
        if (strstr(payload, "ROUND_TURN") != NULL)
        {
            code = (int[]){1, 1, 1, 1};
        }
        else if (strstr(payload, "COOL") != NULL)
        {
            code = (int[]){1, 1, 1, 0};
        }
        else if (strstr(payload, "NEUTRAL") != NULL)
        {
            code = (int[]){1, 0, 1, 0};
        }
        circleturn( HIGH_T_NEGATIVE, 50);
        CodeControl(code);
    }
}

// Demo主任务入口
static void *DemoEntry(const char *arg)
{
    hi_watchdog_disable();
    WifiStaReadyWait();
    CJsonInit();
    printf("cJsonInit init \r\n");
    IoTMain();
    IoTSetMsgCallback(TrafficLightMsgRcvCallBack);

    while (1)
    {
        hi_sleep(TASK_SLEEP_1000MS);
    }
    return NULL;
}

// 初始化任务入口
static void LedExampleEntry(void)
{
    osThreadAttr_t attr;

    IoTGpioInit(IOT_GPIO_INDEX_10);
    IoTGpioInit(IOT_GPIO_INDEX_11);
    IoTGpioSetDir(IOT_GPIO_INDEX_10, IOT_GPIO_DIR_OUT);
    IoTGpioSetDir(IOT_GPIO_INDEX_11, IOT_GPIO_DIR_OUT);

    attr.name = "IOTDEMO";
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = 512;
    attr.priority = 25;

    if (osThreadNew((osThreadFunc_t)DemoEntry, NULL, &attr) == NULL)
    {
        printf("[LedExample] Failed to create IOTDEMO!\n");
    }
}

SYS_RUN(LedExampleEntry);
