import React from 'react'
import type { SVGProps } from 'react'

export function Loading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={48}
      height={48}
      viewBox='0 0 24 24'
      {...props}
    >
      <circle cx={12} cy={2} r={0} fill='currentColor'>
        <animate
          attributeName='r'
          begin={0}
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(45 12 12)'
      >
        <animate
          attributeName='r'
          begin='0.188s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(90 12 12)'
      >
        <animate
          attributeName='r'
          begin='0.375s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(135 12 12)'
      >
        <animate
          attributeName='r'
          begin='0.563s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(180 12 12)'
      >
        <animate
          attributeName='r'
          begin='0.75s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(225 12 12)'
      >
        <animate
          attributeName='r'
          begin='0.938s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(270 12 12)'
      >
        <animate
          attributeName='r'
          begin='1.125s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
      <circle
        cx={12}
        cy={2}
        r={0}
        fill='currentColor'
        transform='rotate(315 12 12)'
      >
        <animate
          attributeName='r'
          begin='1.313s'
          calcMode='spline'
          dur='1.5s'
          keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
          repeatCount='indefinite'
          values='0;2;0;0'
        ></animate>
      </circle>
    </svg>
  )
}
