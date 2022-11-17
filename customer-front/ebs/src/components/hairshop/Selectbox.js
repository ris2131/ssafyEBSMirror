import styled from 'styled-components'

export const Myselect = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	width: 100%;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
	&:focus {
		border-color: blue;
	}
`;

const SelectBoxWrapper = styled.div`
	display: flex;
`;

const IconSVG = styled.svg`
	margin-left: -28px;
	align-self: center;
	width: 24px;
	height: 24px;
`;

const SelectBox = (props) => {


	const handleChange = (e) => {
		{
			props.subject === 'service'
			? props.sfunc(e.target.value)


		: props.subject === 'design'
		? props.dfunc(e.target.value)
		:
		<>잘못된 접근</>
		};
	};

	return (
		<SelectBoxWrapper>
		<Myselect onChange={handleChange}>
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</Myselect>
		<IconSVG xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  			<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
		</IconSVG>
		</SelectBoxWrapper>
	);
};



export default SelectBox;