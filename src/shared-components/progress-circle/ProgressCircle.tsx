import {Box, CircularProgress, CircularProgressProps, Typography} from "@material-ui/core";

function ProgressCircle(props: CircularProgressProps & { value: number }) {
    return(
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary" style={{fontSize: '2rem'}}>
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProgressCircle;